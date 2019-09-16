const soap = require("soap");
const url = "http://localhost:9080/sct/loginWS?wsdl";

class LoginService {
  private static soapClient: any;
  private static instance: LoginService;

  public static getInstance() : LoginService{
      if(LoginService.instance === undefined) LoginService.instance = new LoginService();
      return LoginService.instance;
  }

  constructor() {
    LoginService.soapClient = soap.createClientAsync(url);
  }

  public Login(args: any): any {
    return LoginService.soapClient.then((client: any) => {
      return client.LoginAsync(args);
    });
  }
}

export default LoginService.getInstance;