class ContactsController < ApplicationController
  def create
    # Pega os parâmetros do formulário
    contact_params = params.permit(:name, :surname, :email, :phone, :message)

    begin
      # Envia o e-mail usando o ContactMailer
      ContactMailer.contact_email(
        contact_params[:name],
        contact_params[:surname],
        contact_params[:email],
        contact_params[:phone],
        contact_params[:message]
      ).deliver_now

      # Mensagem de sucesso
      flash[:notice] = "Mensagem enviada com sucesso! Entraremos em contato em breve."
    rescue => e
      # Caso haja erro, exibe a mensagem de erro
      flash[:alert] = "Houve um problema ao enviar sua mensagem. Tente novamente mais tarde."
      Rails.logger.error "Erro ao enviar mensagem: #{e.message}"
    end

    # Redireciona de volta para a página inicial
    redirect_to root_path
  end
end
