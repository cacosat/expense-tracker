import React from "react";

function ContainerGralInfo() {
  // hooks
  
  // functions and values

  // return jsx
  return <>
  <section id="Info" className="text-left">
    <div className="flex flex-col px-12 pt-12 py-6 gap-4">
      <h1 className="text-xl font-bold">NOMBRE</h1>
      <p><span id="name">Joaquín Sateler</span></p>
    </div>
    <div className="flex flex-col px-12 py-6 gap-4">
      <h1 className="text-xl font-bold">EMAIL</h1>
      <p><span id="email">ejemplo@gmail.com</span></p>
    </div>
    <div className="flex flex-col px-12 py-6 gap-4">
      <h1 className="text-xl font-bold">TELÉFONO</h1>
      <p><span id="phone">+56912345678</span></p>
    </div>
  </section>
  <section id="Edit" className="flex justify-center ">
    <form action="" className="flex gap-8">
        <div className="flex flex-col text-start max-w-xs">
          <label htmlFor="name">Nombre: </label>
          <input name="name" type="text" placeholder="Joaquín Sateler" />
        </div>
        <div className="flex flex-col text-start max-w-xs">
          <label htmlFor="email">Correo</label>
          <input name="email" type="text" placeholder="ejemplo@gmail.com" />
        </div>
    </form>
  </section>
  </>
};

export default ContainerGralInfo;