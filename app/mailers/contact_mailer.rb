class ContactMailer < ApplicationMailer
  def contact_email(name, surname, email, phone, message)
    @name = name
    @surname = surname
    @phone = phone
    @message = message
    @user_email = email

    mail(
      to: 'marilene.llima.201@gmail.com',
      subject: 'Nova Mensagem de Contato'
    ) do |format|
      format.html { render 'contact_email' }
    end
  end
end
