import React, {Dispatch} from 'react';
import styles from './QuestionViewPresenter.module.css';
import QuestionElement from "./QuestionElement";
import AnswerAndExplainContainer from "components/workbook/workbook-detail/answer-and-explanation/AnswerAndExplainContainer";
import {WorkbookDataType} from "../../type/WorkbookDataType";
import {ReactComponent as ShareIconDefault} from 'assets/images/public/share_icon_default.svg';
import {ReactComponent as ShareIconHover} from 'assets/images/public/share_icon_hover.svg';
import {ReactComponent as ListviewIconDefault} from 'assets/images/public/listview_icon_default.svg';
import {ReactComponent as ListviewIconHover} from 'assets/images/public/listview_icon_hover.svg';
import PublicImageBtnContainer from "components/public/public-image-btn/PublicImageBtnContainer";
import {NavigateFunction} from "react-router-dom";
import { actionType } from 'reducers/workbook/workbook-detail/workbookModalReducer';

type QuestionViewPresenterPropsType = {
    navigate: NavigateFunction
    workbookData: WorkbookDataType
    dispatch: Dispatch<actionType>,
}

function QuestionViewPresenter({navigate, workbookData, dispatch}:QuestionViewPresenterPropsType){
    return(
        <div className={styles.question_view_root}>
            <div className={styles.question_view_title_container}>
                <span>{workbookData ? workbookData.type : ''} #{workbookData ? workbookData.contentId : ''}</span>
                <span>Q. {workbookData ? workbookData.title : ''}</span>
            </div>
            <div className={styles.question_container}>
                {workbookData && workbookData.contents ? workbookData.contents.map((question,index) => {
                    if(question){
                        return <QuestionElement key={index} questionTitle={question} isCorrect={workbookData.correct === index ? true : false}/>
                    }
                }) : null}
            </div>
            <AnswerAndExplainContainer 
                    quizList={workbookData && workbookData.contents ? workbookData.contents : null}
                    correctIndex={workbookData && workbookData.correct ? workbookData.correct : 0}
                    description={workbookData && workbookData.description ? workbookData.description : null}
                    referenceData={workbookData && workbookData.reference && workbookData.reference ? workbookData.reference : null}
                />
            <div className={styles.question_btn_container}>
                <div>
                    <PublicImageBtnContainer
                            btnText="한/영 전환"
                            options={{border: true}}
                            logoIcon={{
                                default: <ListviewIconDefault />,
                                hover: <ListviewIconHover />,
                            }}
                            btnClickEventHandler={(event: React.MouseEvent)=>{
                                if(workbookData.lang && workbookData.lang === 'Korea'){
                                    dispatch({type: 'English'})
                                } else {
                                    dispatch({type: 'Korea'})
                                }
                            }}
                        />
                </div>
                <div>
                    <PublicImageBtnContainer
                        btnText="목록으로"
                        options={{border: true}}
                        logoIcon={{
                            default: <ListviewIconDefault />,
                            hover: <ListviewIconHover />,
                        }}
                        btnClickEventHandler={(event: React.MouseEvent)=>{
                            navigate(`/quiz/${workbookData.type.toLowerCase()}`)
                        }}
                    />

                    <PublicImageBtnContainer
                        btnText="공유하기"
                        options={{border: true}}
                        logoIcon={{
                            default: <ShareIconDefault />,
                            hover: <ShareIconHover />,
                        }}
                        btnClickEventHandler={(event: React.MouseEvent)=>{
                            if(dispatch){
                                dispatch({type: 'shareWorkbookClick'});
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default QuestionViewPresenter;
