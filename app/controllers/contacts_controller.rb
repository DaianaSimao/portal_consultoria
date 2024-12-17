class ContactsController < ApplicationController
  def create
    name = params[:name]
    surname = params[:surname]
    email = params[:email]
    phone = params[:phone]
    message = params[:message]

    begin
      ContactMailer.contact_email(name, surname, email, phone, message).deliver_now
      # Configura a flash message de sucesso
      flash[:notice] = "Mensagem enviada com sucesso! Entraremos em contato em breve."
    rescue => e
      # Configura a flash message de erro em caso de falha
      flash[:alert] = "Houve um problema ao enviar sua mensagem. Tente novamente mais tarde."
      Rails.logger.error "Erro ao enviar mensagem: #{e.message}"
    end

    redirect_to root_path
  end
end
