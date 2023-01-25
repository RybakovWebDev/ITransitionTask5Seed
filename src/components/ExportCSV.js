import { CSVLink } from "react-csv";

export const ExportCSV = (props) => {
  return (
    <article className='export-csv-parent'>
      <div className='export-csv-cont'>
        <CSVLink
          data={props.finalEntries}
          filename={"Random Entries.csv"}
          className='btn btn-outline-success'
          target='_blank'
        >
          Export CSV
        </CSVLink>
      </div>
    </article>
  );
};
