<!-- Vue SFC -->
<template>
  <div>
    <treeselect v-model="value" :options="options" :normalizer="normalizer" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // define the default value
        value: null,
        // define options
        options: [ {
          id: 'a',
          name: 'a',
          children: [ {
            id: 'aa',
            name: 'aa',
          }, {
            id: 'ab',
            name: 'ab',
          } ],
        }, {
          id: 'b',
          name: 'b',
        }, {
          id: 'c',
          name: 'c',
        } ],
      }

    },
    methods:{
      normalizer(node){
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        }
      }
    }
  }
</script>