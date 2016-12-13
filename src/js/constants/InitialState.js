export const INITIAL_STATE = {
quiz: {
    step: 0,
    questions:[
        {
            id: 0,
            question:'вопрос',
            answerType: 'text',
            answers:[{
                answerId: 0,
                text: 'вариант ответа1',
                isRight: true

                }
            ]
        },
        {
            id: 1,
            question:'вопрос',
            answerType: 'radio',

            answers:[{
                answerId: 0,
                text: 'вариант ответа',
                isRight: false

                },
                {
                    answerId: 1,
                    text: 'вариант ответа 2',
                    isRight: true

                }
            ]
        },
        {
            id: 2,
            question:'вопрос',
            answerType: 'checkbox',
            name:name,

            answers:[{
                answerId: 0,
                text: 'вариант ответа',
                isRight: false

                },
                {
                    answerId: 1,
                    text: 'вариант ответа 2',
                    isRight: true

                }
            ]
        }
    ],
    userAnswers:{
        count: 0,
        rightAnswers: 0,
        answers: []
    }
},


// user:{
//     sessionUid:null,
//     chargeAmounts: []
// },
//     charge:{
//         chargeList:[],
//         errorsParsing:[],
//         isOpened:false,
//         isProcessing:false
//     }
};
