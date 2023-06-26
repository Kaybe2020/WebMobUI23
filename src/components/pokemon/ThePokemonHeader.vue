<script setup>
</script>

<template>
  <div class="navbar">
    <p class="titre"> Pokedex</p>
    <div class="circle">
      <div class="circleBleu"></div>
    </div>
    <div class="square"></div>
    <div class="diagonal"></div>
    <div class="rectangle"></div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.titre {
color:rgb(248, 184, 184);
position: relative;
margin-left:46%;
margin-right:46%;
top:-25px;
font-family: "Pokemon";
font-size: 30px;
letter-spacing: 3px; 
z-index: 4;
}
.navbar {
  display: flex;
  align-items: center;
  height: 100px;
  position: relative;

}

.circle{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  left: 15px;
  background-color: aliceblue;
  position: absolute;
  z-index:4;
}

.circleBleu{
  width: 70px;
  height: 70px;
  left: 5px;
  top: 5px;
  border-radius: 50%;
  background-color: rgb(26, 115, 249);
  position: absolute;
}
.square {
  width: 100px;
  height: 100px;
  background-color: #ef1d1d;
  position: absolute;
  z-index: 3;
}

.diagonal {
  width: 100px;
  height: 100px;
  background-color: #ef1d1d;
  transform: rotate(-40deg);
  position: absolute;
  margin-left: 50px;
  z-index: 2;
  top:-20.5px;
  left:6px;
}

.rectangle {
  width: 100%;
  height: 50px;
  background-color: #ef1d1d;
  z-index: 1;
  position: absolute;
  top: 0;
}

@font-face {
    font-family: "Pokemon"; 
    src: url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.eot"); 
    src: url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.eot?#iefix") 
    format("embedded-opentype"), url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.woff2") 
    format("woff2"), url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.woff") 
    format("woff"), url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.ttf") 
    format("truetype"), url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.svg#Pokemon") 
    format("svg"); 
}
</style>