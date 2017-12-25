Meteor.methods({
  actualizarDatosProducto(datos) {
    check(datos, {
      productoId: String,
      codigo: String,
      nombre: String,
      pcosto: String,
      pventa: String
    })

    if (this.userId) {

      datos.pventa = parseFloat(datos.pventa).toFixed(2)

      datos.pcosto = parseFloat(datos.pcosto).toFixed(2)

      datos.utilidad = datos.pventa - datos.pcosto

      let stock = Productos.findOne({_id: datos.productoId}).stock

      datos.valor = stock * datos.pventa;

      datos.valorCosto = stock * datos.pcosto;

      datos.valorUtilidad = stock * datos.utilidad

      Productos.update({_id: datos.productoId}, {
        $set: {
            codigo: datos.codigo,
            nombre: datos.nombre,
            utilidad: datos.utilidad,
            pcosto: datos.pcosto,
            pventa: datos.pventa,
            valor: datos.valor,
            valorCosto: datos.valorCosto,
            valorUtilidad: datos.valorUtilidad
        }
      })

    } else {
      return
    }

  }
})
