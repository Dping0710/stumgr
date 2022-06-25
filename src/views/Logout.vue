<template> 
</template>

<script>
export default {
    mounted(){
        sessionStorage.removeItem("token");
        this.$router.push('/');
    }
}
</script>

<style>

</style>