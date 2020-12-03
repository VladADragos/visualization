import RuleSets from "./RuleSets";

class Rules{

    // rule number -> number -> number -> number
    // rule current right left -> next state

    static rules = [

    ]
    // no op
    static rule0(current: number,right:number,left:number):number{
        return 0;
    }

    static matchCellState(input:[number,number,number],ruleSet: number[]): number{
        let inputAsStr = input.toString();
        switch (inputAsStr) {
            case [1,1,1].toString():
                return ruleSet[0];
            case [1,1,0].toString():
                return ruleSet[1];
            case [1,0,1].toString():
                return ruleSet[2];
            case [1,0,0].toString():
                return ruleSet[3];
            case [0,1,1].toString():
                return ruleSet[4];
            case [0,1,0].toString():
                return ruleSet[5];
            case [0,0,1].toString():
                return ruleSet[6];
            case [0,0,0].toString():
                return ruleSet[7];

            default:
                console.assert(false);
                console.error("ERROR WITH RULE SET ");
                return 100;
        }

    } 
    static rule1(left:number,current: number,right:number):number{
        let ruleSet: number[] = RuleSets.get(130);
        let cellState:[number,number,number] = [left,current,right];
        return Rules.matchCellState(cellState,ruleSet);
        // return 1;
    }
    static rule2(current: number,right:number,left:number):number{
        if (current  && (right || left)) return 1;
        if (!current  && (right && left)) return 1;
        return 0;
    }

    
}




export default Rules;