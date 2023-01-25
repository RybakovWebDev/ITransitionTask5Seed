export const FakeEntry = (props) => {
  const renderEntry = () => {
    return props.fakeEntries.map((el, i) => {
      return (
        <div className='entry-cont' key={props.uuidv4()}>
          <div className='entry-info-cont'>
            <div className='entry-info-fields-cont'>
              <h4 className='entry-info-field'>
                Index: <br />
                ID: <br />
                Full Name: <br />
                Phone number: <br />
                Address:
              </h4>
            </div>
            <div className='entry-info-values-cont'>
              <h4 className='entry-info-value'>
                {i + 1}
                <br />
                {el.id}
                <br />
                {el.fullName}
                <br />
                {el.phone}
                <br />
                {el.address}
              </h4>
            </div>
          </div>

          {i !== props.fakeEntries.length - 1 ? <div className='horizontal-separator'></div> : ""}
        </div>
      );
    });
  };

  return (
    <article className='entries-parent' onScroll={props.scrollHandler}>
      {renderEntry()}
    </article>
  );
};
