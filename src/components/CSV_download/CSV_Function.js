const convertArrayOfObjectsToCSV = (data) => {
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header.map((fieldName) => `"${row[fieldName]}"`).join(',')
    );
    csv.unshift(header.join(',')); // Add header row
    return csv.join('\n');
  };
  
  export const downloadCSV = (data) => {
    const csv = convertArrayOfObjectsToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };