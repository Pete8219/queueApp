export function timeline(start, end, short, minTime) {

    const records = []
    records.length = (end - start - short ) * 60 /minTime


    //в цикле заполняем массив интервалами приема
    for (let i = 0; i < records.length; i++) {
        const today = new Date()
        today.setHours(start) // устанваливаем время начала приема
        records[i] = {
            isBusy: false,
            access:true,
            time  : (new Date(today.setMinutes(i * minTime))).toLocaleTimeString().slice(0,5)
        }

    }
    return records
}