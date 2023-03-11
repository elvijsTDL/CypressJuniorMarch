import { BasePage } from "./BasePage";

const INVENTORY_CONTAINER = ".inventory_container";

export class ProductsPage extends BasePage {
  static validateVisibleInventoryContainer() {
    this.isVisible(INVENTORY_CONTAINER);
  }

  static inventoryContainerDoesNotExist() {
    this.doesNotExist(INVENTORY_CONTAINER);
  }
}
