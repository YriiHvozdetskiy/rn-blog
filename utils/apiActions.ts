import axios from "axios";

import {apiRoutes} from "@/utils/apiRoutes";

const apiActions = {
   fetchOrders: async (method, value = null, id = null) => {
      try {
         return await axios({
            method: method,
            url: apiRoutes.orders(id),
            data: value,
         });
      } catch (error) {
         return error;
      }
   },
   deleteUser: async () => {
      try {
         await axios.delete(apiRoutes.login);

         return true;
      } catch (error) {
         return false;
      }
   }
}

export default apiActions;