export default function Cart() {
  return (
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <p class="m-0 h5">Shopping Cart</p>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="text-center" width="100">
                      Image
                    </th>
                    <th class="text-left">Product Name</th>
                    <th class="text-left" width="100">
                      Model
                    </th>
                    <th class="text-center" width="200">
                      Quantity
                    </th>
                    <th class="text-right" width="100">
                      Unit Price
                    </th>
                    <th class="text-right" width="120">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">
                      <img
                        alt=""
                        class="img-thumbnail p-0 border-0"
                        src="https://via.placeholder.com/50x50"
                      />
                    </td>
                    <td class="text-left">
                      <p class="m-0">HP LP3065</p>
                      <p class="m-0">Delivery Date: 2011-04-22</p>
                    </td>
                    <td class="text-left">LP3065</td>
                    <td class="text-center">
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control text-center"
                          id=""
                          name=""
                          value="1"
                          min="1"
                          max="5"
                          placeholder="Quantity"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-sync-alt"></i>
                          </button>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">$122.00</td>
                    <td class="text-right">$122.00</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <img
                        alt=""
                        class="img-thumbnail p-0 border-0"
                        src="https://via.placeholder.com/50x50"
                      />
                    </td>
                    <td class="text-left">
                      <p class="m-0">HP LP3065</p>
                    </td>
                    <td class="text-left">LP3065</td>
                    <td class="text-center">
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control text-center"
                          id=""
                          name=""
                          value="1"
                          min="1"
                          max="5"
                          placeholder="Quantity"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-sync-alt"></i>
                          </button>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">$122.00</td>
                    <td class="text-right">$122.00</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <img
                        alt=""
                        class="img-thumbnail p-0 border-0"
                        src="https://via.placeholder.com/50x50"
                      />
                    </td>
                    <td class="text-left">
                      <p class="m-0">HP LP3065</p>
                      <p class="m-0">Reward Points: 300</p>
                    </td>
                    <td class="text-left">LP3065</td>
                    <td class="text-center">
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control text-center"
                          id=""
                          name=""
                          value="1"
                          min="1"
                          max="5"
                          placeholder="Quantity"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-sync-alt"></i>
                          </button>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">$122.00</td>
                    <td class="text-right">$122.00</td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <img
                        alt=""
                        class="img-thumbnail p-0 border-0"
                        src="https://via.placeholder.com/50x50"
                      />
                    </td>
                    <td class="text-left">
                      <p class="m-0">HP LP3065</p>
                    </td>
                    <td class="text-left">LP3065</td>
                    <td class="text-center">
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control text-center"
                          id=""
                          name=""
                          value="1"
                          min="1"
                          max="5"
                          placeholder="Quantity"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-sync-alt"></i>
                          </button>
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">$122.00</td>
                    <td class="text-right">$122.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="text-right" colspan="5">
                      Sub-Total
                    </td>
                    <td class="text-right">$100.00</td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="5">
                      Eco Tax (-2.00)
                    </td>
                    <td class="text-right">$2.00</td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="5">
                      VAT (20%)
                    </td>
                    <td class="text-right">$20.00</td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="5">
                      <p class="m-0 h5">Genaral Total</p>
                    </td>
                    <td class="text-right">
                      <p class="m-0 h5">$122.00</p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="card-footer text-right">
              <button type="button" class="btn btn-secondary">
                Continue Shopping
              </button>
              <button type="button" class="btn btn-primary">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
