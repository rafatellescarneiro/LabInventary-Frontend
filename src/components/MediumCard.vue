<template>
    <!-- Componente CARD MEDIUM SIZE -->
    <label>
        <div 
        id="modal-btn" 
        data-bs-toggle="modal" 
        :data-bs-target="cardType == 'inventory' ? '#editItemModal' : '#collabModal'">
        <!-- cardType imagem  -->
            <img 
            class="img" 
            :src="img" 
            size="100"
            >
            <span class="first mb-3 mt-3 lh-1 fw-bold">{{ first }}</span>
            <p class="second">{{ second }}</p>
            <p class="third">{{ third }}</p>
            <!-- cardType define se <span/> ou <p/> -->
            <span 
            class="fourth" 
            v-if="cardType == 'inventory' && (fourth == 'Item disponível' || fourth == '')">
            Na empresa
            </span>
            <span class="fourth" v-else-if="cardType == 'inventory'">{{fourth}}</span>
            <p class="fourth" v-else-if="cardType == 'user-list'">{{ fourth }}</p>
        </div>
    </label>
</template>
<script>
export default {
    // Propiedades a serem passadas nas views
    props: {
        img: {
            type: String
        },
        first: {
            type: String
        },
        second: {
            type: String
        },
        third: {
            type: String
        },
        fourth: {
            type: String
        },
        cardType: {
            type: String
        }
    },
}
</script>
<style scoped>

img {
max-width: 35%;
max-height: 35%;
}
/* span abaixo da img */
.first {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
/* Container geral do CARD */
label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 340px;
    background-color: rgb(187, 218, 245);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}
/* <p></p> base do CARD */
.fourth {
    
    font-weight: bold;
    color: rgb(17, 110, 183);
}
</style>