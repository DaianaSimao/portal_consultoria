class ContactsController < ApplicationController
  def create
    contact_params = params.permit(:name, :surname, :email, :phone, :message)

    begin
      # Envia o e-mail
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

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace('flash-messages', partial: 'shared/flash')
      end
      format.html do
        redirect_to root_path
      end
    end
  end
end
