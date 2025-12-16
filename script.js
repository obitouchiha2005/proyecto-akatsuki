let juegos=[];for(let i=1;i<=100;i++){juegos.push({id:i,nombre:'Juego Akatsuki #'+i,precio:parseFloat((Math.random()*50+30).toFixed(2)),descuento:Math.random()<0.3?0.3:0,img:'akatsuki.jpg'});}
let carrito=[];

function cargarJuegos(){let grid=document.getElementById('juegos-grid');grid.innerHTML='';
juegos.forEach(j=>{let pf=j.precio-(j.precio*j.descuento);
grid.innerHTML+=`<div class='juego-card'><img src='imagenes/${j.img}'><h3>${j.nombre}</h3><p>S/ ${pf.toFixed(2)}</p><button class='btn-principal' onclick='agregarCarrito(${j.id})'>Agregar</button></div>`;});}

function agregarCarrito(id){carrito.push(juegos.find(j=>j.id===id));actualizarCarrito();}

function actualizarCarrito(){document.getElementById('cantidad-carrito').textContent=carrito.length;
let subtotal=carrito.reduce((a,j)=>a+j.precio,0);document.getElementById('subtotal').textContent=subtotal.toFixed(2);
document.getElementById('total').textContent=subtotal.toFixed(2);}

function aplicarDescuento(){let code=document.getElementById('codigo-descuento').value.trim().toUpperCase();
let subtotal=carrito.reduce((a,j)=>a+j.precio,0);
if(code==='AKATSUKI'){let d=subtotal*0.5;document.getElementById('descuento-aplicado').textContent=d.toFixed(2);
document.getElementById('total').textContent=(subtotal-d).toFixed(2);alert('Descuento AKATSUKI aplicado! -50%');}
else alert('Código inválido');}

function finalizarCompra(){if(carrito.length===0){alert('El carrito está vacío');return;}
document.getElementById('modal-pago').style.display='flex';}
function cerrarPago(){document.getElementById('modal-pago').style.display='none';}

document.getElementById('form-tarjeta').addEventListener('submit',e=>{
e.preventDefault();
let n=document.getElementById('tarjeta-num').value.trim();
let cvv=document.getElementById('tarjeta-cvv').value.trim();
let nom=document.getElementById('tarjeta-nombre').value.trim();
if(n.length!==16)return alert('Tarjeta inválida');
if(cvv.length!==3)return alert('CVV inválido');
if(nom.length<3)return alert('Nombre inválido');
document.getElementById('pago-msg').innerHTML='<span style=color:#0f0>Pago exitoso ✔</span>';
carrito=[];actualizarCarrito();setTimeout(()=>cerrarPago(),2000);
});

cargarJuegos();
