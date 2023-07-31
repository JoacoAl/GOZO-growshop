const {createApp} = Vue;

const app = createApp ({
    data(){
        return{
            seleccionadas: [],
            totalCompra: 0,
            totalProductos: 0,
        }
    },
    created(){

      this.format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

      this.seleccionadas = JSON.parse(localStorage.getItem("seleccionadas")) ?? [];
              // Detecta si el usuario ha sido redirigido desde la página de pago
              if (window.location.search.includes('payment_id')) {
                // El usuario ha sido redirigido desde la página de pago
                // Muestra un mensaje de éxito y borra el carrito
                alert('¡Tu compra ha sido exitosa!');
                this.deleteCompras();
            }
  },
  
    methods:{
      redirectToPayment() {
        const items = this.seleccionadas.map(producto => ({
            title: producto.nombre,
            description: producto.descripcion,
            quantity: producto.cantidad,
            currency_id: 'ARS',
            unit_price: producto.precio
        }));

        // Crea la preferencia de pago con los items dinámicos
        fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TEST-1559251038431848-073110-e6100fab33c28279e8189aa2c02b7bbf-63764321'
            },
            body: JSON.stringify({
                items,
                back_urls: {
                    success: `http://localhost:8080/assets/pages/carrito.html`
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            // Aquí puedes obtener el ID y la URL de la preferencia de pago
            const preferenceId = data.id;
            const preferenceUrl = data.init_point;

            // Redirige al usuario a la página de pago
            window.location.href = preferenceUrl;
        });
    },
    deleteCompras() {
        localStorage.removeItem("seleccionadas");
        this.seleccionadas = [];
    },
    redirection(){
      return window.location.href = "/assets/pages/accesorios.html"
    },
    redirectionPay(){
      return window.location.href = "/assets/pages/accesorios.html"//especificar ruta de pago
    },
    async descartarProducto(id) {
      const result = await Swal.fire({
          title: '¿Estás seguro de que quieres descartar este producto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
      });
  
      if (result.isConfirmed) {
          this.elementos = JSON.parse(localStorage.getItem('seleccionadas'));
          this.elementosFiltrados = this.elementos.filter(elemento => elemento.id !== id);
          this.json = JSON.stringify(this.elementosFiltrados);
          localStorage.setItem('seleccionadas', this.json);
  
          await Swal.fire({
              title: '¡Producto descartado!',
              icon: 'success'
          });
  
          window.location.href = "/assets/pages/carrito.html";
      }
  },
},

    computed:{
        resultado() {
            this.totalCompra = this.seleccionadas.reduce(
              (total, articulo) => total + articulo.precio * articulo.cantidad,
              0
            );
            const json = JSON.stringify(this.totalCompra);
            localStorage.setItem("resultado", json);
          },
          cantidad() {
            this.totalProductos = this.seleccionadas.reduce(
              (total, articulo) => total + articulo.cantidad,
              0
            );
            const json = JSON.stringify(this.totalProductos);
            localStorage.setItem("cantidad", json);
          },
    },
})
app.mount("#app")

