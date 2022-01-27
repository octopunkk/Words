import "./Stats.css";

export function Stats(props) {
  let getGameTime = () => {
    let gameTime = Math.floor((props.timeEnd - props.timeBegin) / 1000);
    let min = Math.floor(gameTime / 60);
    let sec = gameTime % 60;
    return `${min}:${sec}`;
  };

  return (
    <div className="Stats">
      <div className="GameTime"> Time : {getGameTime()}</div>
    </div>
  );
}
