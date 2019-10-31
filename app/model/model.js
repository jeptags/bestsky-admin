const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const _ = require('lodash');


/**
*  Validations
*/
var validatePresenceOf = function(value) {
   return (this.provider && this.provider !== 'local') || (value && value.length);
};


/**
* Getter
*/
var escapeProperty = function(value) {
   return _.escape(value);
};


/**
* User Schema
*/

var UserSchema = new Schema({
   email: {
       type: String,
       required: true,
       unique: true,
   },
   hashed_password: {
       type: String,
       validate: [validatePresenceOf, 'Password cannot be blank']
   },
   surname: String,
   first_name: String,
   last_name: String,
   username: String,
   language: String,
   contact_no: Number,
   address: String,
   remember_token: String,
   business_id: String,
   is_cmmsn_agnt: Boolean,
   cmmsn_percent:Number,
   selected_contacts:String,
   deleted_at: Date,
   created_at: Date,
   updated_at: Date,
   salt: String,
   resetPasswordToken: String,
   resetPasswordExpires: Date
});


/**
* Virtuals
*/
UserSchema.virtual('password').set(function(password) {
   this._password = password;
   this.salt = this.makeSalt();
   this.hashed_password = this.hashPassword(password);
}).get(function() {
   return this._password;
});


/**
* Pre-save hook
*/
UserSchema.pre('save', function(next) {
   if (this.isNew && this.provider == 'local' && this.password && !this.password.length)
       return next(new Error('Invalid password'));
   next();
});


/**
* Methods
*/
UserSchema.methods = {

   /**
    * Authenticate - check if the passwords are the same
    *
    * @param {String} plainText
    * @return {Boolean}
    * @api public
    */
   authenticate: function(plainText) {
       return this.hashPassword(plainText) == this.hashed_password;
   },

   /**
    * Make salt
    *
    * @return {String}
    * @api public
    */
   makeSalt: function() {
       return crypto.randomBytes(16).toString('base64');
   },

   /*
    * Hash password
    *
    * @param {String} password
    * @return {String}
    * @api public
    */
   hashPassword: function(password) {
       if (!password || !this.salt) return '';
       var salt = new Buffer(this.salt, 'base64');
       return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
   },

   /**
    * Hide security sensitive fields
    *
    * @returns {*|Array|Binary|Object}
    */
   toJSON: function() {
       var obj = this.toObject();
       delete obj.hashed_password;
       delete obj.salt;
       return obj;
   }
};

mongoose.model('users', UserSchema);














//Done
var categories = new Schema({
    name: String,
    business_id:String,
    short_code:String,
    parent_id:String,
    created_by: String,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('categories', categories);

//Done
var SubCategory = new Schema({
    CategoryId: String,
    Name: String,
    Description: String,
    Picture: String,
    createdAt: Date,
    updatedAt: Date,
});

mongoose.model('SubCategory', SubCategory);

// Done
var Company = new Schema({
    BusinessID: String,
    CompanyName: String,
    OwnerName: String,
    Address: String,
    City: String,
    Region: String,
    Postscode: String,
    Country: String,
    Phone: String,
    Fax: String,
    Email: String,
    Password: String,
    GEOLat: String,
    GEOLong: String,
    PromotionCode: String,
    createdAt: Date,
    updatedAt: Date,
});

mongoose.model('Company', Company);

// Done
var StoresDetail = new Schema({
    CompanyId: String,
    Name: String,
    Address: String,
    City: String,
    Region: String,
    Postscode: String,
    Country: String,
    Phone: String,
    Fax: String,
    GEOLat: String,
    GEOLong: String,
    createdAt: Date,
    updatedAt: Date,
});

mongoose.model('StoresDetail', StoresDetail);




// var BrandDetail = new Schema({
//     BrandOptionID: String,
//     Name: String,
//     Description: String,
//     Picture: String,
//     createdAt: Number,
//     updatedAt: Number,
// });

// mongoose.model('BrandDetail', BrandDetail);


var ProductReview = new Schema({
    CustomerId: String,
    Comment: String,
    Ratings: String,
    createdAt: Number,
    updatedAt: Number,
});

mongoose.model('ProductReview', ProductReview);


var WarrantyDetail = new Schema({
    Datesale: String,
    DateEnd: String,
    AgentID: String,
    createdAt: Number,
    updatedAt: Number,
});

mongoose.model('WarrantyDetail', WarrantyDetail);


var TrackingDetail = new Schema({
    StatusID: String,
    Counter: String,
    ScanTagLat: String,
    ScanTagLong: String,
    createdAt: Number,
    updatedAt: Number,
});


var OrderList = new Schema({
    TrackingId: String,
    CustomerId: String,
    ProductID: String,
    Shiping: String,
    Amount: Number,
    DiscountId: String,
    Invoice: String,
    Paid: String,
    Quantity: Number,
    WarrantyID: String,
    createdAt: Number,
    updatedAt: Number,
});

mongoose.model('OrderList', OrderList);

// Done
var Authentic = new Schema({
    Desciption: String,
    createdAt: Date,
    updatedAt: Date,
});

mongoose.model('Authentic', Authentic);


//Done
var Customer = new Schema({
    FirstName: String,
    LastName: String,
    CompanyName: String,
    Address: String,
    City: String,
    Region: String,
    Postscode: String,
    Country: String,
    Phone: String,
    Fax: String,
    Email: String,
    Password: String,
    GEOLat: String,
    GEOLong: String,
    createdAt: Date,
    updatedAt: Date,
});

mongoose.model('Customer', Customer);


var Tags = new Schema({
    Id: String,
    TagID: String,
    JeptagID: String,
    TagType: Number,
    SellerID: Number,
    BusinessID: Number,
    ProductID: Number,
    TagLat: Number,
    TagLong: Number,
    AddessTags: Number,
    StatusID: Number,
    AddedBy: Number,
    BatchID: Number,
    BatchID: Number,
    WarrantyID: Number,
    updatedAt: Number,
    createdAt: Number,
});

mongoose.model('Tags', Tags);

// Done
var Discount = new Schema({
    PromoCode: String,
    Amount: Number,
    Percentage: String,
    SpecialPrice: Number,
    // ValidDate: Number, //Client
    ValidDate:Date,      
    createdAt: Date,
    updatedAt: Date,
});

mongoose.model('Discount', Discount);

// Done
var barcodes = new Schema({
    name: String,
    description: String,
    width: String, 
    height: String, 
    paper_width: String, 
    paper_height: String, 
    top_margin: String, 
    left_margin: String, 
    row_distance: String, 
    col_distance: String, 
    stickers_in_one_row: Number,
    is_default: { 
        type: Boolean, 
        default: false
    },
    is_continuous: {
        type: Boolean,
        default: false
    },
    stickers_in_one_sheet:Number,
    // business_id:Number,
    business_id:String,          
    createdAt: Date,
    updatedAt: Date,

});

mongoose.model('barcodes', barcodes);

// Done
var brands = new Schema({
    business_id:String,
    name: String,
    description: String,
    created_by: Number,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('brands', brands);

// Done
var currencies = new Schema({
    country:String,
    currency: String,
    code: String,
    symbol: String,
    thousand_separator: String,
    decimal_separator: String,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('currencies', currencies);

// Done
var customergroups = new Schema({
    business_id:String,
    name: String,
    amount: Number,
    created_by: String,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('customer_groups', customergroups);

// Done
var expensecategories = new Schema({
    business_id:String,
    name: String,
    code: String,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('expense_categories', expensecategories);

//Note:-Check on client DB structure some quation is their

// Done
var business = new Schema({
    name:String,
    currency_id: String,
    start_date: Date,
    tax_number_1: String,
    tax_label_1: String,
    tax_number_2: String,
    tax_label_2: String,
    default_sales_tax: Number,
    default_profit_percent:String,  //NOT NULL DEFAULT '0.00',
    owner_id:String,
    time_zone:String, //NOT NULL DEFAULT 'Asia/Kolkata',
    fy_start_month:Number,
    accounting_method:String, // ('fifo','lifo','avco')  NOT NULL DEFAULT 'fifo',
    default_sales_discount:String,
    sell_price_tax:String, // ('includes','excludes')  NOT NULL DEFAULT 'includes',
    logo:String,
    sku_prefix:String,
    enable_product_expiry:String,
    expiry_type:String, //('add_expiry','add_manufacturing')  NOT NULL DEFAULT 'add_expiry',
    on_product_expiry:String, //('keep_selling','stop_selling','auto_delete') NOT NULL DEFAULT 'keep_selling',
    stop_selling_before:Number,
    enable_tooltip:String,
    purchase_in_diff_currency:String,
    purchase_currency_id:Number,
    p_exchange_rate:String,
    transaction_edit_days:Number,
    stock_expiry_alert_days:Number,
    keyboard_shortcuts:String,
    pos_settings:String,
    enable_brand:Number,
    enable_category:Number,
    enable_sub_category:Number,
    enable_price_tax:Number,
    enable_purchase_status:Number,
    enable_lot_number:Number,
    default_unit:Number,
    enable_racks:Number,
    enable_row:Number,
    enable_position:Number,
    enable_editing_product_from_purchase:Number,
    sales_cmsn_agnt:String, //enum('logged_in_user','user','cmsn_agnt')
    item_addition_method:Number,
    enable_inline_tax:Number,
    currency_symbol_placement:String, // enum('before','after')
    enabled_modules:String,
    date_format:String, // NOT NULL DEFAULT 'm/d/Y'
    time_format:String, //enum('12','24')  DEFAULT '24',   
    theme_color:String,
    email_settings:String,
    sms_settings:String,
    is_active:Boolean,
    created_by:Number,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('business', business);


var bookings = new Schema({
    contact_id:String,
    waiter_id: String,
    table_id: String,
    correspondent_id:String,
    business_id:String,
    location_id:String,
    booking_start:Date,
    booking_end:Date,
    created_by:Number,
    booking_status:String, //enum('booked','completed','cancelled')
    booking_note:String,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('bookings', bookings);

//Note:-Check on client DB structure some quation is their
var businesslocations = new Schema({
    business_id:String,
    location_id: String,
    name: String,
    landmark:String,
    country:String,
    state:String,
    zip_code:String,
    invoice_scheme_id:String,
    invoice_layout_id:String,
    print_receipt_on_invoice:String,
    receipt_printer_type:String, //  enum('browser','printer') 
    printer_id:String,
    mobile:String,
    alternate_number:String,
    email:String,
    website:String,
    custom_field1:String,
    custom_field2:String,
    custom_field3:String,
    custom_field4:String,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('business_locations', businesslocations);


var cashregisters = new Schema({
    business_id:String,
    user_id: String,
    status: String, //enum('close','open')
    closed_at:Date,
    closing_amount:String,
    total_card_slips:String,
    total_cheques:String,
    closing_note:String,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('cash_registers', cashregisters);


var cashregistertransactions = new Schema({
    cash_register_id:String,
    amount: Number,
    pay_method: String, //enum('cash','card','cheque','bank_transfer','custom_pay_1','custom_pay_2','custom_pay_3','other')
    type:String, //enum('debit','credit')
    transaction_type:String, //enum('initial','sell','transfer','refund')
    transaction_id:String,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('cash_register_transactions', cashregistertransactions);


var contacts = new Schema({
    business_id:String,
    type: String, //enum('supplier','customer','both') 
    supplier_business_name: String, 
    name:String,
    email:String,
    contact_id:String,
    tax_number:String,
    city:String,
    state:String,
    country:String,
    landmark:String,
    mobile:String,
    landline:String,
    alternate_number:String,
    pay_term_number:Number,
    pay_term_type:String,  //enum('days','months') 
    credit_limit:String,
    is_default:Boolean,
    customer_group_id:String,
    custom_field1:String,
    custom_field2:String,
    custom_field3:String,
    custom_field4:String,
    created_by:Number,
    deleted_at:Date,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('contacts', contacts);




var groupsubtaxes = new Schema({
    group_tax_id:String,
    tax_id: String,
});

mongoose.model('group_sub_taxes', groupsubtaxes);



var invoicelayouts = new Schema({
    name:String,
    header_text: String,
    invoice_no_prefix: String,
    quotation_no_prefix: String,
    invoice_heading: String,
    sub_heading_line1: String,
    sub_heading_line2: String,
    sub_heading_line3: String,
    sub_heading_line4: String,
    sub_heading_line5: String,
    invoice_heading_not_paid: String,
    invoice_heading_paid: String,
    quotation_heading: String,
    sub_total_label: String,
    discount_label: String,
    tax_label: String,
    total_label: String,
    total_due_label: String,
    paid_label: String,
    show_client_id: String,
    client_id_label: String,
    client_tax_label: String,
    date_label: String,
    show_time: String,
    show_brand: String,
    show_sku: String,
    show_cat_code: String,
    show_expiry: String,
    show_lot: String,
    show_sale_description: String,
    sales_person_label: String,
    show_sales_person: String,
    table_product_label: String,
    table_qty_label: String,
    table_unit_price_label: String,
    table_subtotal_label: String,
    cat_code_label: String,
    logo: String,
    show_logo: String,
    show_business_name: String,
    show_location_name: String,
    show_landmark: String,
    show_city: String,
    show_state: String,
    show_zip_code: String,
    show_country: String,
    show_mobile_number: String,
    show_alternate_number: String,
    show_email: String,
    show_tax_1: String,
    show_tax_2: String,
    show_barcode: String,
    show_payments: String,
    show_customer: String,
    customer_label: String,
    highlight_color: String,
    footer_text: String,
    module_info: String,
    is_default: String,
    business_id: String,
    design :String,
    cn_heading: String,
    cn_no_label: String,
    cn_amount_label: String,
    table_tax_headings: String,
    created_at: Date,
    updated_at: Date,
   
});

mongoose.model('invoice_layouts', invoicelayouts);


var invoiceschemes = new Schema({
    business_id:String,
    name: String,
    scheme_type: String, //enum('blank','year')
    prefix: String,
    start_number: String,
    invoice_count: String,
    total_digits: String,
    is_default: String,
    created_at: String,
    updated_at: String,
});

mongoose.model('invoice_schemes', invoiceschemes);



var migrations = new Schema({
    migration:String,
    batch: String,
});

mongoose.model('migrations', migrations);




var modelhaspermissions = new Schema({
    // permission_id:String,
    model_id: String,
    model_type: String,
});

mongoose.model('model_has_permissions', modelhaspermissions);





var modelhasroles = new Schema({
    // role_id:String,
    model_id: String,
    model_type: String,
});

mongoose.model('model_has_roles', modelhasroles);



var notificationtemplates = new Schema({
    business_id: String,
    template_for: String,
    email_body: String,
    sms_body: String,
    subject: String,
    auto_send: String,
    auto_send_sms: String,
    created_at: String,
    updated_at: String,
});

mongoose.model('notification_templates', notificationtemplates);



var passwordresets = new Schema({
    email: String,
    token: String,
    created_at: Date,
});

mongoose.model('password_resets', passwordresets);


var permissions = new Schema({
    name: String,
    guard_name: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('permissions', permissions);


var printers = new Schema({
    business_id: String,
    name: String,
    connection_type: String,
    capability_profile: String,
    char_per_line: String,
    ip_address: String,
    port: String,
    path: String,
    created_by: Number,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('printers', printers);


var products = new Schema({
    name: String,
    business_id: String,
    type: String, //enum('single','variable','modifier')
    unit_id: String,
    brand_id: String,
    batch_id: String,
    category_id: String,
    sub_category_id: String,
    tax: Number,
    tax_type: String, //enum('inclusive','exclusive')
    enable_stock: Number,
    alert_quantity: Number,
    sku: String,
    barcode: String,
    barcode_type: String, //enum('C39','C128','EAN13','EAN8','UPCA','UPCE')
    expiry_period: Number,
    expiry_period_type: String, // enum('days','months') 
    enable_sr_no: Number,
    weight: String,
    product_custom_field1: String,
    product_custom_field2: String,
    product_custom_field3: String,
    product_custom_field4: String,
    url: String,
    image: String,
    latitude: String,
    longitude: String,
    salemode: String, // enum
    ship: String, // enum
    productview: String, // enum
    description: String,
    short_description: String,
    created_by: Number,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('products', products);


var productracks = new Schema({
    business_id: String,
    location_id: String,
    product_id: String,
    rack: String,
    row: String,
    position: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('product_racks', productracks);


var productvariations = new Schema({
    variation_template_id: String,
    name: String,
    product_id: String,
    is_dummy: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('product_variations', productvariations);



var purchaselines = new Schema({
    transaction_id: String,
    product_id: String,
    variation_id: String,
    quantity: String,
    pp_without_discount: String,
    discount_percent: String,
    purchase_price: String,
    purchase_price_inc_tax: String,
    item_tax: String,
    tax_id: String,
    quantity_sold: String,
    quantity_adjusted: String,
    quantity_returned: String,
    mfg_date: Date,
    exp_date: Date,
    lot_number: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('purchase_lines', purchaselines);



var referencecounts = new Schema({
    ref_type: String,
    ref_count: String,
    business_id: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('reference_counts', referencecounts);


var resproductmodifiersets = new Schema({
    product_id: String,
});

mongoose.model('res_product_modifier_sets', resproductmodifiersets);



var restables = new Schema({
    business_id: String,
    location_id: String,
    name: String,
    description:String,
    created_by:Number,
    deleted_at:Date,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('res_tables', restables);


var roles = new Schema({
    name: String,
    guard_name: String,
    business_id: String,
    is_default:Boolean,
    is_service_staff:Boolean,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('roles', roles);



var rolehaspermissions = new Schema({
    permission_id: String,
    role_id: String,
});

mongoose.model('role_has_permissions', rolehaspermissions);



var sellingpricegroups = new Schema({
    name: String,
    description: String,
    business_id: String,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
 
});

mongoose.model('selling_price_groups', sellingpricegroups);


var sessions = new Schema({
    user_id: String,
    ip_address: String,
    user_agent: String,
    payload: String,
    last_activity: String,
 
});

mongoose.model('sessions', sessions);


var stockadjustmentstemp = new Schema({
       id: String,
});

mongoose.model('stock_adjustments_temp', stockadjustmentstemp);



var stockadjustmentlines = new Schema({
    transaction_id: String,
    product_id: String,
    variation_id: String,
    quantity: String,
    unit_price: String,
    removed_purchase_line: String,
    lot_no_line_id: String,
    created_at: Date,
    updated_at: Date,
 
});

mongoose.model('stock_adjustment_lines', stockadjustmentlines);



var system = new Schema({
    key: String,
    value: String,
});

mongoose.model('system', system);



// var users = new Schema({
//     surname: String,
//     first_name: String,
//     last_name: String,
//     username: String,
//     email: String,
//     password: String,
//     language: String,
//     contact_no: Number,
//     address: String,
//     remember_token: String,
//     business_id: String,
//     is_cmmsn_agnt: Boolean,
//     cmmsn_percent:Number,
//     selected_contacts:String,    
//     deleted_at: Date,
//     created_at: Date,
//     updated_at: Date,
// });

// mongoose.model('users', users);


var taxrates = new Schema({
    business_id: String,
    name: String,
    amount: Number,
    is_tax_group: Boolean,
    created_by: String,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('tax_rates', taxrates);


var transactions = new Schema({
    business_id: String,
    location_id: String,
    res_table_id: Number,
    res_waiter_id: String,
    res_order_status: String, //enum('received','cooked','served')
    type: String, //enum('purchase','sell','expense','stock_adjustment','sell_transfer','purchase_transfer','opening_stock','sell_return','opening_balance','purchase_return')
    status: String, //enum('received','pending','ordered','draft','final')
    is_quotation: String,
    payment_status: String,  //enum('paid','due','partial')
    adjustment_type: String, //enum('normal','abnormal')
    contact_id: String,
    customer_group_id: String,
    invoice_no: String,
    ref_no: String,
    transaction_date: Date,
    total_before_tax: String,
    tax_id: String,
    tax_amount: Number,
    discount_type: String, //enum('fixed','percentage') 
    discount_amount: Number,
    shipping_details: String,
    shipping_charges: Number,
    additional_notes: String,
    staff_note: String,
    final_total: Number,
    expense_category_id: String,
    expense_for: String,
    commission_agent: String,
    document: String,
    is_direct_sale: String,
    exchange_rate: Number,
    total_amount_recovered: Number,
    transfer_parent_id: String,
    return_parent_id: String,
    opening_stock_product_id: String,
    created_by: String,
    pay_term_number: String,
    pay_term_type: String,
    selling_price_group_id: String,
    created_at: Date,
    updated_at: Date,

});

mongoose.model('transactions', transactions);


var transactionpayments = new Schema({
    transaction_id: String,
    business_id: String,
    is_return: Boolean,
    amount: Number,
    method: String,  //enum('cash','card','cheque','bank_transfer','custom_pay_1','custom_pay_2','custom_pay_3','other')
    transaction_no: String,
    card_transaction_number: Number,
    card_number: String,
    card_type: String,
    card_holder_name: String,
    card_month: String,
    card_year: String,
    card_security: String,
    cheque_number: String,
    bank_account_number: String,
    paid_on: Date,
    created_by: String,
    payment_for: String,
    parent_id: String,
    note: String,
    payment_ref_no: String,
    account_id: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('transaction_payments', transactionpayments);


var transactionselllines = new Schema({
    transaction_id: String,
    product_id: String,
    variation_id: String,
    quantity: Number,
    quantity_returned: Number,
    unit_price_before_discount: Number,
    unit_price: Number,
    line_discount_type: String, //enum('fixed','percentage')
    line_discount_amount: Number,
    unit_price_inc_tax: Number,
    item_tax: Number,
    tax_id: String,
    lot_no_line_id: String,
    sell_line_note: String,
    parent_sell_line_id: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('transaction_sell_lines', transactionselllines);



var transactionselllinespurchaselines = new Schema({
    sell_line_id: String,
    stock_adjustment_line_id: String,
    purchase_line_id: String,
    quantity: Number,
    qty_returned: Number,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('transaction_sell_lines_purchase_lines', transactionselllinespurchaselines);


//Done
var units = new Schema({
    business_id: String,
    actual_name: String,
    short_name: String,
    allow_decimal: Boolean,
    created_by: Number,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('units', units);



// var users = new Schema({
//     surname: String,
//     first_name: String,
//     last_name: String,
//     username: String,
//     email: String,
//     password: String,
//     language: String,
//     contact_no: Number,
//     address: String,
//     remember_token: String,
//     business_id: String,
//     is_cmmsn_agnt: Boolean,
//     cmmsn_percent:Number,
//     selected_contacts:String,    
//     deleted_at: Date,
//     created_at: Date,
//     updated_at: Date,
// });

// mongoose.model('users', users);


var usercontactaccess = new Schema({
    user_id: String,
    contact_id: String,
});

mongoose.model('user_contact_access', usercontactaccess);



var variations = new Schema({
    name: String,
    product_id: String,
    sub_sku: String,
    product_variation_id: String,
    variation_value_id: String,
    default_purchase_price: Number,
    dpp_inc_tax: Number,
    profit_percent: Number,
    default_sell_price: Number,
    sell_price_inc_tax: Number,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('variations', variations);



var variationgroupprices = new Schema({
    variation_id: String,
    price_group_id: String,
    price_inc_tax: Number,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('variation_group_prices', variationgroupprices);




var variationlocationdetails = new Schema({
    product_id: String,
    product_variation_id: String,
    variation_id: String,
    location_id: String,
    qty_available: Number,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('variation_location_details', variationlocationdetails);



var variationtemplates = new Schema({
    name: String,
    business_id: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('variation_templates', variationtemplates);


var variationvaluetemplates = new Schema({
    name: String,
    variation_template_id: String,
    created_at: Date,
    updated_at: Date,
});

mongoose.model('variation_value_templates', variationvaluetemplates);





















