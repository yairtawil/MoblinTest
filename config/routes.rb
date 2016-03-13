Rails.application.routes.draw do
  root 'application#main_index'
  get '/home/GetSecurityQuestions', to: 'application#get_security_questions'
end
