import * as React from 'react';
import { ShowRender } from '../components/ShowRender';
import { Contestant } from './Contestant';

import '../App.css';
import { QuizMaster } from './QuizMaster';
import { CorrectAnswerTracker } from './CorrectAnswerTracker';
import { IncorrectAnswerTracker } from './IncorrectAnswerTracker';

export const MathQuiz = () => {
  return (
    <div className="app">
      <div className="panels">
        <div className="panel">
          <div className="header">
            <h1>&lt;MathQuiz /&gt;</h1>
            <ShowRender />
          </div>
          <div className="panels">
            <div className="resultTracker">
              <div className="panel">
                <CorrectAnswerTracker />
              </div>
              <div className="panel">
                <IncorrectAnswerTracker />
              </div>
            </div>
            <div className="panel">
              <QuizMaster />
            </div>
            <div className="panel">
              <Contestant />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
