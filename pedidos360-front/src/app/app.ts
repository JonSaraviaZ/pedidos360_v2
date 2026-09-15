import { Component } from "@angular/core";
import {
  signInWithRedirect,
  signOut,
  fetchAuthSession,
  getCurrentUser
} from 'aws-amplify/auth'

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  usuario = '';
  token = '';
  autenticado = false;
  pedidos : any[] = [];
  cargandoPedidos = false;
  errorPedidos = '';

  async login(){
    await signInWithRedirect();
  }
  async logout(){
    await signOut();
  }
  async verSesion(){
    try{
      const user = await getCurrentUser();
      const session = await fetchAuthSession();
      this.usuario = user.username;
      this.token = session.tokens?.accessToken?.toString()??'';
      this.autenticado = true;
      console.log("Usuario:",user);
      console.log("Access Token:",session.tokens?.accessToken?.toString())
    }
    catch(Error){
      console.log("No existe sesion",Error);
      this.autenticado = false;
    }
  }

  async consultarPedidos(){
    this.cargandoPedidos = true;
    this.errorPedidos = '';

    try{
      // Lógica para consultar pedidos
      const session = await fetchAuthSession();
      const token = session.tokens?.accessToken?.toString()??''; //si la sesión tiene token y access token, se cambia a un string y se guarda en la variable token
      if(!token){ // !token significa si es nulo.
        this.errorPedidos = "Debe iniciar sesión para consultar pedidos";
        return;
      }
      const response = await fetch('https://owk3iegt6f.execute-api.us-east-1.amazonaws.com/test/api/pedidos',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Http Status: ', response.status);

      if(!response.ok){ // response.ok es true si el status es 200-299, false si es otro status
        this.errorPedidos = `Error HTTP: ${response.status}`;
        return;
      }
      this.pedidos = await response.json();
      console.log("Pedidos recibidos:", this.pedidos);

    }
    catch(error){
      console.error("Error al consultar pedidos:", error);
      this.errorPedidos = "No fue posible conectar con la API de pedidos."

    }
    finally{ // Esto se ejecuta siempre, haya habido error o no
      this.cargandoPedidos = false;
    }

  }
}