class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  def main_index
  end

  def get_security_questions
    questions = []
    questions << {index: 0, question: 'What is your first pet name?'}
    questions << {index: 1, question: 'What is your mother maiden name?'}
    questions << {index: 2, question: 'What is the name of your first school?'}
    questions << {index: 3, question: 'What is your spouse name?'}
    questions << {index: 4, question: 'Where did you born?'}
    questions << {index: 5, question: 'Where did you meet your spouse?'}
    render json: {questions: questions, num_of_questions: 3}
  end

  def submit_answers
    contents = params['contents']
    num_of_answers = 0 if contents.nil?
    num_of_answers = contents.count unless contents.nil?
    render json: {num_of_answers: num_of_answers}
  end
end
