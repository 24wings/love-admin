export interface People {

    name: string;
    gender: '男' | '女';
    age: number;
    anwsers: {
        question: String,
        value: String,
        fullLength: number
    }[];
    /**
     * 基础分,前端计算出来的
     */
    baseScore: number;
    filterAge: {
        label: string;
        value: 'old' | 'small' | 'both';
    };
    filterCity: {
        label: string;
        value: string;
    };
    filterGender: {
        label: string;
        value: 'same' | 'different' | 'both';
    };


    isSelected: boolean;
    isMatched: boolean;
}
