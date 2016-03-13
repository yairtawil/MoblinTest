Rails.application.routes.draw do
  root 'application#main_index'
  get '/home/GetSecurityQuestions',  to: 'application#get_security_questions'
  post '/home/SubmitAnswers',        to:'application#submit_answers'
end
