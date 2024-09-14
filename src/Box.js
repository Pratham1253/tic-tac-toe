function Box({ sign, addSign }) {
  return (
    <div>
      <div className="box" onClick={addSign}>
        {sign}
      </div>
    </div>
  );
}

export default Box;
