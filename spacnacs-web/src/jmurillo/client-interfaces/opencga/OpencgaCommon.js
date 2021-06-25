class OpencgaCommon {

    static parseOpencgaDate(dateString) {
        if (!!dateString){
            if ( dateString.length >= 14 && !dateString.includes("-")) {
                const year = dateString.substring(0, 4);
                const month = dateString.substring(4, 6);
                const day = dateString.substring(6, 8);
                const hour = dateString.substring(8, 10);
                const minute = dateString.substring(10, 12);
                const second = dateString.substring(12, 14);
                const s = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
                return new Date(s);
            } else {
                try {
                    return new Date (dateString)
                } catch (error) {
                    console.error(error);
                }
            }
        } else {
            return null;
        }
    }


}

export default OpencgaCommon;
