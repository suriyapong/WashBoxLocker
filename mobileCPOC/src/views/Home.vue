<script>
import feathersClient from "../plugins/feathers-client";

export default {
  async mounted() {
   
        const { user } = await feathersClient.get('authentication');         
  
        console.log(user)
        const roleId = user.RoleId
        if (roleId === 1) {
          this.$router.push("/mainpass");
        }
        if (roleId === 2) {
          this.$router.push('/mainpass');
        }
         if (roleId === 3) {
          this.$router.push('/mainpass');
        }
        //  if (roleId === 4) {
        //   this.$router.push('/manageflight');
        // }
        //  if (roleId === 5) {
        //   this.$router.push('/checkinactive');
        // }
        //  if (roleId === 6) {
        //   this.$router.push('/dashboard');
        // }
        //  if (roleId === 7) {
        //   this.$router.push('/checkinalcohol');
        // }
        //  if (roleId === 8) {
        //   this.$router.push('/transport');
        // }
        // if (roleId === 9) {
        //   this.$router.push('/manageflight');
        // }
     
  }
};
</script>
  
  