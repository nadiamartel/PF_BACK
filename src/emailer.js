const nodemailer = require('nodemailer')
const { template } = require('./template.js')
const nodemailerSendgrid = require('nodemailer-sendgrid');

const createTrans = () => {
   /* const transport = nodemailer.createTransport({
       host: "sandbox.smtp.mailtrap.io",
       port: 2525,
       auth: {
         user: "9d7b69f8fd8b3d",
         pass: "1d3176577bc208"
       }
     });*/
    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: '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',
        })
        );
return transport;
}

const sendMail = async (user) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Sportiverse ⚡"<sportiversee@gmail.com>',
        to: `${user.email}`,
        subject: `Hola ${user.name}, te damos la bienvenida a Sportiverse`,
        html: template,

    });
    console.log("Message sent %s", info.messageId);
    return

}

const sendMailReservation = async (user) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Sportiverse ⚡" <sportiversee@gmail.com>',
        to: `${user?.emailUser}`,
        subject: `Hola ${user?.user}, tu reserva ya ha sido proceda en Sportiverse`,
        html: `<center></br></br></br>
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top">
          <img src="https://user-images.githubusercontent.com/124950194/253368042-8e6e9919-c806-458b-a2d3-9566663f56ec.png" alt="Logo de Sportiverse" width="380" style="width:100%;max-width:380px!important" class="CToWUd" data-bit="iit">
        </td>
      </tr>
      <tr>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table width="600" cellpadding="0" cellspacing="0" border="0" class="m_-4305861466075260814container">
                  <tr>
                    <td height="60" style="font-size:60px;line-height:60px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center" valign="top" style="background-color:#ffffff">
                      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;color:#333333;font-size:25px;line-height:36px;font-weight:700">
                        Hola ${user?.user}, tu reserva ya ha sido procesada en Sportiverse
                      </p>
                      <p style="margin:0;font-size:20px;line-height:20px">&nbsp;</p>
                      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;color:#333333;font-size:16px;line-height:24px;font-weight:400;max-width:520px">
                        Estos son los detalles de tu reserva <br>
                        Actividad: ${user?.activity}<br>
                        Fecha: ${user?.date}<br>
                        Costo: ${user?.cost}<br>
                        Hora: ${user?.hour}<br>
                        Sucursal: ${user?.store}<br>
                        Dirección: ${user?.storeAddress}<br>
                        Estado del pago: Aprobado
                      </p>
                      <p style="margin:0;font-size:24px;line-height:24px">&nbsp;</p>
                      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;color:#333333;font-size:16px;line-height:24px;font-weight:400;max-width:520px">
                        ¡Ven y diviértete en grande!
                      </p>
                    </td>
                  </tr>
                </table></br>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <img src="https://user-images.githubusercontent.com/124950194/253445790-ff55dcf4-d4da-47b4-8b83-3dff1b2b8441.JPG" alt="Imagen deportiva" width="380" style="width:100%;max-width:380px!important" class="CToWUd" data-bit="iit">
              </td>
            </tr>
            <tr>
              <td align="justify" valign="top"><br><br>
                <p style="padding:0;margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:14px;color:#999999">
                  Te informamos que los datos personales contenidos en esta comunicación fueron recogidos en nuestro Formulario de registro, cuyo responsable es Sportiverse, dado que prestaste tu consentimiento para recibir nuestras comunicaciones. Al registrarte como usuario, aceptas y consientes que tus datos sean almacenados por nuestra plataforma para gestionar el envío de las comunicaciones correspondientes.
                </p>
              </td>
            </tr>
            <tr>
              <td height="40" style="font-size:40px;line-height:40px">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
  `,
    });
    console.log("Message sent %s", info.messageId);
    return
}


exports.sendMail = (user) => sendMail(user)

exports.sendMailReservation = (user, reservation) => sendMailReservation(user, reservation)
