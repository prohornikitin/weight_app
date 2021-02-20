/**
 * @module
 */


/**
 * User object null stub (Null Object pattern)
 */
class NullUser {
  constructor() {
    this.email = '';
    this.password = '';
    this.weightStatistics = [];
  }
  
  isNull() {
    return true;
  }
};

export default NullUser;