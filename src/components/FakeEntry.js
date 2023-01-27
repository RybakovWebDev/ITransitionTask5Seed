export const FakeEntry = (props) => {
  const renderEntry = () => {
    return props.fakeEntries.map((el, i) => {
      return (
        <tr>
          <th scope='row'>{i + 1}</th>
          <td>{el.id}</td>
          <td>{el.fullName}</td>
          <td>{el.address}</td>
          <td>{el.phone}</td>
        </tr>
      );
    });
  };

  return (
    <article className='entries-parent' onScroll={props.scrollHandler}>
      <table>
        <tr>
          <th className='table-index' scope='col'>
            Index
          </th>
          <th className='table-id' scope='col'>
            ID
          </th>
          <th className='table-name' scope='col'>
            Full name
          </th>
          <th className='table-address' scope='col'>
            Address
          </th>
          <th className='table-phone' scope='col'>
            Phone number
          </th>
        </tr>

        {renderEntry()}
      </table>
    </article>
  );
};
