import React from "react";

interface Props {
  config: number;
  setConfig: React.Dispatch<React.SetStateAction<number>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Config: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="config">
        <fieldset>
          <legend>Difficulty</legend>
          {[0, 1, 2].map((radio) => (
            <label htmlFor={`rlebel-${radio}`} key={`radio-${radio}`}>
              <span>{["Eassy", "Medium", "Hard"][radio]}</span>
              <input
                type="radio"
                name="level"
                id={`rlebel-${radio}`}
                value={radio}
                defaultChecked={props.config === radio}
                onChange={() => props.setConfig(radio)}
              />
            </label>
          ))}
        </fieldset>
        <br />
        <button onClick={(event) => props.setStart(true)}>Start</button>
      </div>
    </>
  );
};
