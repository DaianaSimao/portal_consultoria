class ContactMailer < ApplicationMailer
  default from: 'from@example.com'

  def contact_email(name, surname, email, phone, message)
    @name = name
    @surname = surname
    @message = message
    @phone = phone
    @email = email

    mail(to: 'marilene.llima.201@gmail.com', subject: 'Novo Contato pelo Formulário') do |format|
      format.text { render plain: "Mensagem de #{@name} #{@surname}\n\n#{@message}" }
      format.html { render html: "<strong>Mensagem de #{@name} #{@surname}</strong><br><p>#{@message}</p>".html_safe }
    end
  end
end
