export function getReadyToSubmission(records, index, record, serviceType) {
    if(serviceType === 'consultation') {
        records.map(record => record.access = false)
    }

    const arr = [];
        for (let i = index; i < index + 4; i++) {
            if (i >= records.length || records.length - index < 4) {
            continue;
            }
            arr.push(records[i]);
        }

        const item = arr.filter(function (it) {
            return it.isBusy === true;
        });

  

  if (!item.length && arr.length === 4) {
    record.access = true;
  } else {
    record.access = false;
  }

    return records

}