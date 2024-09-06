export const saveDurationText = (diff: number) => {
    if(diff < 3){
        return "recently (less than 3 seconds ago)..."
    }

    else if(diff > 7){
        return "A long time ago (more than 7 seconds ago) ..."
    }

    else{
        return `a few seconds ago (in between 3 and 7 seconds ago) ...`
    }
}