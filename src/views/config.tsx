import React from "react";

interface Props {
  config: number;
  setConfig: React.Dispatch<React.SetStateAction<number>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Config: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="card is-fullwidth">
        <div className="card-content">
          <div className="content">
            <div className="control vertical">
              {[0, 1, 2].map((radio) => (
                <label
                  className="radio"
                  key={`radio-${radio}`}
                  htmlFor={`rlebel-${radio}`}
                >
                  <input
                    type="radio"
                    name="level"
                    className="radio"
                    id={`rlebel-${radio}`}
                    value={radio}
                    defaultChecked={props.config === radio}
                    onChange={() => props.setConfig(radio)}
                  />
                  &nbsp;&nbsp;
                  <span>{["Eassy", "Medium", "Hard"][radio]}</span>
                </label>
              ))}
            </div>
            <br />
            <button
              className="button is-primary is-light is-medium is-fullwidth"
              onClick={() => props.setStart(true)}
            >
              Start
            </button>
          </div>
        </div>
      </div>
      {/* <div className="config">
        <fieldset>
          <legend>Difficulty</legend>
          
        </fieldset>
        <br />
      </div> */}
    </>
  );
};
