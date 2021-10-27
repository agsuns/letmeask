
interface QuestionCommon {
    content: string,
    author: {
        name: string,
        avatar: string,
        isHighlighted: boolean,
        isAnswered: boolean,
    },
}

export interface FirebaseQuestion extends QuestionCommon {
    likes: {
        [key: string]: {
            userId: string,
        }
    }
}

export interface ClientQuestion extends QuestionCommon {
    id: string,
    likeId: string | undefined,
    likesCount: number,
}