<template>
  <div class="container">
    <div
      class="modal fade"
      id="editItemModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <!-- TÍTULO -->
            <h3 class="modal-title" id="exampleModalLabel">Editar item</h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <editItem-form
              id="editItem-form"
              :validation-schema="schema"
              v-slot="{ errors }"
            >
              <!-- Primeira linha: CÓD. PATRIMÔNIO e TÍTULO  -->
              <div class="row mb-3">
                <div class="col-4">
                  <label class="form-label">Patrimônio</label>
                  <editItem-field
                    disabled
                    type="text"
                    class="form-control"
                    name="patrimonio"
                    v-model="item.patrimonio"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.patrimonio"
                    v-show="errors.patrimonio"
                  >
                  </span>
                </div>
                <div class="col-8">
                  <label class="form-label">Título</label>
                  <editItem-field
                    type="text"
                    class="form-control"
                    name="titulo"
                    v-model="item.titulo"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.titulo"
                    v-show="errors.titulo"
                  >
                  </span>
                </div>
              </div>
              <!-- Segunda linha: CATEGORIA e VALOR do item-->
              <div class="row mb-3">
                <div class="col-9">
                  <label class="form-label">Categoria</label>
                  <editItem-field
                    as="select"
                    class="form-select"
                    name="categoria"
                    v-model="item.categoria"
                  >
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Móveis">Móvel</option>
                    <option value="Acessórios">Acessórios</option>
                  </editItem-field>
                  <span
                    class="text-danger"
                    v-text="errors.categoria"
                    v-show="errors.categoria"
                  >
                  </span>
                </div>
                <div class="col-3">
                  <label class="form-label">Valor R$</label>
                  <editItem-field
                    type="text"
                    class="form-control"
                    name="valor"
                    v-model="item.valor"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.valor"
                    v-show="errors.valor"
                  >
                  </span>
                </div>
              </div>
              <!-- Terceira linha: imagem do item -->
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">Imagem do item</label>
                  <editItem-field
                    type="file"
                    class="form-control"
                    name="imagem"
                    v-model="item.imagem"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.imagem"
                    v-show="errors.imagem"
                  >
                  </span>
                </div>
                <div class="col-6">
                  <img :src="item.imagem">
                </div>
              </div>
              <!-- Quarta linha: MARCA e MODELO do item -->
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">Marca</label>
                  <editItem-field
                    type="text"
                    class="form-control"
                    name="marca"
                    v-model="item.marca"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.marca"
                    v-show="errors.marca"
                  ></span>
                </div>
                <div class="col-6">
                  <label class="form-label">Modelo</label>
                  <editItem-field
                    type="text"
                    class="form-control"
                    name="modelo"
                    v-model="item.modelo"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.modelo"
                    v-show="errors.modelo"
                  >
                  </span>
                </div>
              </div>
              <!-- Quarta linha: DESCRIÇÃO do item -->
              <div class="row mb-3">
                <div class="col-12">
                  <label class="form-label">Descrição</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    v-model="item.descricao"
                  >
                  </textarea>
                </div>
              </div>
            </editItem-form>
          </div>
          <!-- Botões SAIR DELETAR SALVAR -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-bs-dismiss="modal"
              @click="delItem"
            >
              Excluir
            </button>
            <button
              type="button"
              class="btn btn-outline-info"
              data-bs-dismiss="modal"
            >
              Sair
            </button>
            <button
              type="button"
              class="btn btn-info"
              data-bs-dismiss="modal"
              @click="saveItem"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import rules from "../../validations/validateitens";
// import { mapState } from "vuex";

rules;
export default {
  components: {
    "editItem-form": Form,
    "editItem-field": Field,
  },
  data() {
    return {
      schema: {
        patrimonio: "required|patrimonycheck",
        titulo: "required",
        categoria: "required",
        valor: "required|pricecheck",
        imagem: "required",
        marca: "required",
        modelo: "required",
      },
      item: {}, // Populado pelo watch primeiro e depois pelos inputs
    };
  },
  methods: {
    // formatMoneyValue(value) {
    //   return value.replace(".", ".");
    // },
    // Salva as edições no item
    saveItem() {
      // Envia as edições para store
      let value = this.item.valor
      this.item.valor = value.replace(",", ".")
      this.item.valor = Number(this.item.valor)
      this.$store.dispatch("itens/saveItemedit", {
        _id: this.item._id,
        patrimonio: this.item.patrimonio,
        titulo: this.item.titulo,
        categoria: this.item.categoria,
        valor: this.item.valor,
        imagem: this.item.imagem,
        marca: this.item.marca,
        modelo: this.item.modelo,
        descricao: this.item.descricao,
        emprestado: this.item.emprestado,
      });
      let form = document.getElementById("editItem-form");
      form.reset();
    },
    // Envia o código de patrimônio do item
    // a ser deletado para a store de itens
    delItem() {
      this.$store.dispatch("itens/delItem", this.item.patrimonio);
    },
  },
  watch: {
    // Popula this.item com os dados do item selecionado para edição
    edit(novoItem) {
      // console.log(Object.values(novoItem._id))
      this.item = {
        _id: Object.values(novoItem._id)[0],
        patrimonio: novoItem.patrimonio,
        titulo: novoItem.titulo,
        categoria: novoItem.categoria,
        valor: novoItem.valor.toFixed(2).replace(".", ","),
        imagem: novoItem.imagem,
        marca: novoItem.marca,
        modelo: novoItem.modelo,
        descricao: novoItem.descricao,
        emprestado: novoItem.emprestado,
      };
    },
  },
  computed: {
    // ...mapState({
    //   edit: (state) => state.itens.edit,
    // }),
    // Computada quando um novo item é selecionado
    // em EmprestaItem.vue ou Inventory.vue
    edit() {
      return this.$store.getters["itens/sendItemToEdit"];
    },
  },
};
</script>

<style scoped>
.form-label {
  margin-bottom: 1px;
}
.form-control {
  font-size: 11pt;
}
.form-select {
  font-size: 11pt;
}
</style>