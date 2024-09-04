import React from "react";

function PalletManage() {
  return (
    <div className="min-h-screen">
      <h1 className="custom-title-1">Pallet Management</h1>
      <div className="custom-box-2">
        <div className="custom-box-2">
          <h1 className="custom-box-title-1">Pallet Mover</h1>
          <div className="flex flex-row space-x-2">
            <div className="custom-input-layout-1">
              <label>Pallet ID</label>
              <input
                type="text"
                className="custom-text-input-1"
                placeholder="XX-XX-X"
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Plant Type</label>
              <ul className="custom-radio-1 grid-cols-2">
                <li className="radio-item">
                  <div className="radio-button-1">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value="engine"
                      name="list-radio"
                    />
                    <label className="radio-label">Engine</label>
                  </div>
                </li>
                <li className="radio-item">
                  <div className="radio-button-1">
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value="casting"
                      name="list-radio"
                    />
                    <label className="radio-label">Casting</label>
                  </div>
                </li>
              </ul>
            </div>

            <div className="custom-input-layout-1">
              <label>Plant Number</label>
              <ul className="custom-radio-1 grid-cols-3">
                <li className="radio-item">
                  <div className="radio-button-1">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value="engine"
                      name="list-radio"
                    />
                    <label className="radio-label">1</label>
                  </div>
                </li>
                <li className="radio-item">
                  <div className="radio-button-1">
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value="casting"
                      name="list-radio"
                    />
                    <label className="radio-label">2</label>
                  </div>
                </li>
                <li className="radio-item">
                  <div className="radio-button-1">
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value="casting"
                      name="list-radio"
                    />
                    <label className="radio-label">3</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="custom-input-layout-1">
              <form>
                <label>Row</label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="custom-text-input-1"
                  placeholder="1"
                  required
                />
              </form>
            </div>
            <div className="custom-input-layout-1">
              <form>
                <label>Lane</label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="custom-text-input-1"
                  placeholder="10"
                  required
                />
              </form>
            </div>
            <div className="custom-input-layout-1">
              <form>
                <label>Pile</label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="custom-text-input-1"
                  placeholder="10"
                  required
                />
              </form>
            </div>
            <div className="custom-input-layout-1">
              <form>
                <label>Layer</label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="custom-text-input-1"
                  placeholder="10"
                  required
                />
              </form>
            </div>
          </div>
          <div className="my-2 space-x-2">
            <button
              type="primary"
              size="large"
              className="custom-button-1-green"
            >
              MOVE
            </button>
            <button
              type="primary"
              size="large"
              className="custom-button-1-pink"
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PalletManage;
