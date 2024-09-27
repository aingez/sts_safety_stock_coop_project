-- Drop all table if exists
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS pallet_position_layer_2;
DROP TABLE IF EXISTS pallet_position_layer_1;
DROP TABLE IF EXISTS current_part;
DROP TABLE IF EXISTS pallet_status;
DROP TABLE IF EXISTS warehouse_list;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS part_list;
-- remove all enum types
-- DROP TYPE IF EXISTS part_type;
-- DROP TYPE IF EXISTS part_model;

-- Create enum types for part_list table
CREATE TYPE part_type AS ENUM ('Engine', 'Block', 'Head', 'Crankshaft', 'Camshaft');
CREATE TYPE part_model AS ENUM ('CONV', 'HV', 'CONV/HV', '1NR', '2NR', '3NR', '889F-IN', '889F-EX', '926F-IN', '926F-EX', 'D13E-IN', 'D13E-EX');

-- Create tables
CREATE TABLE part_list (
    id SERIAL PRIMARY KEY,
    type part_type NOT NULL,
    model part_model NOT NULL,
    in_production BOOLEAN NOT NULL
    prefix JSON NOT NULL,
);

CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE warehouse_list (
    plant_key SERIAL PRIMARY KEY,
    plant_type VARCHAR(255) NOT NULL,
    plant_id INTEGER NOT NULL,
    max_lane INTEGER NOT NULL,
    max_row INTEGER NOT NULL,
    color_layout JSON,
    is_active BOOLEAN NOT NULL,
    UNIQUE (plant_type, plant_id) -- Unique constraint for non duplicate plant id in each plant type
);


CREATE TABLE pallet_status (
    id SERIAL PRIMARY KEY,
    pallet_name VARCHAR(255) NOT NULL,
    position INT,
    plant_key INT NOT NULL,
    is_pack BOOLEAN NOT NULL,
    max_capacity INT NOT NULL,
    FOREIGN KEY (plant_key) REFERENCES warehouse_list(plant_key)
);

CREATE TABLE current_part (
    serial VARCHAR(255) PRIMARY KEY,
    type INT,
    pallet_id INTEGER NOT NULL,
    pack_date TIMESTAMP NOT NULL,
    packer_id INTEGER NOT NULL,
    FOREIGN KEY (type) REFERENCES part_list(id),
    FOREIGN KEY (pallet_id) REFERENCES pallet_status(id),
    FOREIGN KEY (packer_id) REFERENCES staff(id)
);

CREATE TABLE pallet_position_layer_1 (
    id SERIAL PRIMARY KEY,
    plant_key INT NOT NULL,
    row INT NOT NULL,
    lane INT NOT NULL,
    max_pile INT NOT NULL,
    max_layer INT NOT NULL,
    FOREIGN KEY (plant_key) REFERENCES warehouse_list(plant_key)
);

CREATE TABLE pallet_position_layer_2 (
    id SERIAL PRIMARY KEY,
    pile INT NOT NULL,
    layer INT NOT NULL,
    layer1_id INT NOT NULL,
    is_occupied BOOLEAN NOT NULL,
    FOREIGN KEY (layer1_id) REFERENCES pallet_position_layer_1(id)
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    type INT,
    serial VARCHAR(255) UNIQUE NOT NULL,
    -- pack_location INT NOT NULL,
    pack_date TIMESTAMP NOT NULL,
    packer_id INTEGER NOT NULL,
    unpack_date TIMESTAMP,
    unpacker_id INTEGER,
    pallet_id INTEGER,
    -- pack location
    plant_type VARCHAR(255),
    plant_id INTEGER,
    row INTEGER,
    lane INTEGER,
    pile INTEGER,
    layer INTEGER,
    FOREIGN KEY (type) REFERENCES part_list(id),
    -- FOREIGN KEY (pack_location) REFERENCES pallet_position_layer_2(id),
    FOREIGN KEY (packer_id) REFERENCES staff(id),
    FOREIGN KEY (unpacker_id) REFERENCES staff(id),
    FOREIGN KEY (pallet_id) REFERENCES pallet_status(id)
);
-- CREATE TABLE history (
--     id SERIAL PRIMARY KEY,
--     type INT,
--     serial VARCHAR(255) UNIQUE NOT NULL,
--     pack_location INT NOT NULL,
--     pack_date TIMESTAMP NOT NULL,
--     packer_id INTEGER NOT NULL,
--     unpack_date TIMESTAMP,
--     unpacker_id INTEGER,
--     pallet_id INTEGER,
--     FOREIGN KEY (type) REFERENCES part_list(id),
--     FOREIGN KEY (pack_location) REFERENCES pallet_position_layer_2(id),
--     FOREIGN KEY (packer_id) REFERENCES staff(id),
--     FOREIGN KEY (unpacker_id) REFERENCES staff(id),
--     FOREIGN KEY (pallet_id) REFERENCES pallet_status(id)
-- );

-- Add foreign key constraint to pallet_status after creating pallet_position_layer_2
ALTER TABLE pallet_status
ADD CONSTRAINT fk_position
FOREIGN KEY (position) REFERENCES pallet_position_layer_2(id);
ALTER TABLE warehouse_list ADD CONSTRAINT unique_plant_type_id UNIQUE (plant_type, plant_id);
ALTER TABLE staff ADD CONSTRAINT unique_id UNIQUE (id);
ALTER TABLE pallet_status ADD CONSTRAINT unique_pallet_in_plant UNIQUE (pallet_name, plant_key);
ALTER TABLE part_list ADD CONSTRAINT unique_model_in_type UNIQUE (type, model);
ALTER TABLE pallet_position_layer_2 ADD CONSTRAINT unique_position_in_layer1 UNIQUE (pile, layer, layer1_id);


-- trigger funciton and trigger for update pallet_status i spack
-- trigger when insert, update, delete on current_part
-- if there current part refer to pallet_id that no longer exist in current_part, set is_pack to false

CREATE OR REPLACE FUNCTION update_pallet_is_pack_status()
RETURNS TRIGGER AS $$
BEGIN
    -- If the operation is DELETE, check if the remaining parts exist on the old pallet
    IF TG_OP = 'DELETE' THEN
        IF NOT EXISTS (
            SELECT 1
            FROM current_part
            WHERE pallet_id = OLD.pallet_id
        ) THEN
            -- Set is_pack to false when no parts are found
            UPDATE pallet_status
            SET is_pack = FALSE
            WHERE id = OLD.pallet_id;
        END IF;

    -- If the operation is INSERT or UPDATE, ensure is_pack is true for the new pallet
    ELSE
        UPDATE pallet_status
        SET is_pack = TRUE
        WHERE id = NEW.pallet_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger that calls the function after insert, update, or delete on current_part
CREATE TRIGGER trigger_update_pallet_is_pack_status
AFTER INSERT OR DELETE OR UPDATE ON current_part
FOR EACH ROW
EXECUTE FUNCTION update_pallet_is_pack_status();


-- trigger function and trigger for update pallet_position_layer_2 is_occupied when got refered by pallet_status
CREATE OR REPLACE FUNCTION update_pallet_position_layer_2_status()
RETURNS TRIGGER AS $$
BEGIN
    -- If the old position is no longer referenced, set is_occupied to false
    IF OLD.position IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1
            FROM pallet_status
            WHERE position = OLD.position
        ) THEN
            UPDATE pallet_position_layer_2
            SET is_occupied = FALSE
            WHERE id = OLD.position;
        END IF;
    END IF;

    -- If the new position is referenced, set is_occupied to true
    IF NEW.position IS NOT NULL THEN
        UPDATE pallet_position_layer_2
        SET is_occupied = TRUE
        WHERE id = NEW.position;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger that calls the function after an update on pallet_status.position
CREATE TRIGGER trigger_update_pallet_position_layer_2_status
AFTER UPDATE OF position ON pallet_status
FOR EACH ROW
EXECUTE FUNCTION update_pallet_position_layer_2_status();
