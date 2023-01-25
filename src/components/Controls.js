import { Button } from "react-bootstrap";

export const Controls = (props) => {
  const renderRegionOptinos = (regions) => {
    return regions.map((r) => {
      return (
        <option key={props.uuidv4()} value={r}>
          {r}
        </option>
      );
    });
  };

  return (
    <article className='app-controls-parent'>
      <div className='app-controls-left'>
        <label className='app-controls-select-label' htmlFor='regions-select'>
          Choose a region:
        </label>
        <select value={props.region} name='regions' id='regions-select' onChange={props.regionHandler}>
          {renderRegionOptinos(props.regions)}
        </select>
      </div>
      <div className='app-controls-middle'>
        <div className='error-controls-cont'>
          <label className='errors-select-label' htmlFor='errors-slider'>
            Select number of errors per entry:
          </label>
          <input id='errors-number' type='number' value={props.errorCount} onChange={props.errorNumberHandler} />
          <input
            id='errors-slider'
            type='range'
            min='1'
            max='1000'
            value={props.errorCount}
            onChange={props.errorSliderHandler}
          />
        </div>
      </div>
      <div className='app-controls-right'>
        <div className='seed-controls-cont'>
          <div className='seed-manual-cont'>
            <input id='seed-number' type='number' value={props.seed} onChange={props.seedHandler} max={30000} />
            <h3 id='seed-current-label'>Current seed</h3>
          </div>
          <Button id='seed-generate' variant='outline-dark' onClick={props.seedHandler}>
            Generate new seed
          </Button>
        </div>
      </div>
    </article>
  );
};
