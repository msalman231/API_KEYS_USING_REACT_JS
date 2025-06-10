import mongoose from 'mongoose';


const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Subscription name is required.'],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required.'],
        min: [0,'Price must be greater than 0'],
        max: [1000000,'Price must be less than 1000000'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD','INR'],
        default: 'INR',
    },
    frequency: {
        type: String,
        enum: ['daily','weekly','monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        enum: ['sports', 'business', 'education', 'entertainment', 'finance', 'general', 'health', 'lifestyle', 'politics', 'science', 'technology', 'travel'],
        required: [true, 'Subscription category is required.'],
    },
    paymentMethod: {
        type: String,
        enum: ['credit card', 'paypal', 'bank transfer'],
        default: 'credit card',
        required: [true, 'Subscription payment method is required.'],
        trim: true,
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required.'],
        validate: {
            validator:(value)=> value < new Date(),
            message: props => `${props.value} is not a valid date.`
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value){ return value > this.startDate;},
            message: props => `${props.value} date must be after start date.`
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Subscription user is required.'],
        index: true,
    }
},{timestamps: true});

subscriptionSchema.pre('save', function (next) {
  if(!this.renewalDate){
      const renewalPeriods ={
          daily: 1,
          weekly: 7,
          monthly: 30,
          yearly: 365,
      };

      this.renewalDate = new Date(this.startDate);
      this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  if(this.renewalDate < new Date()){
      this.status = 'expired';
  }

  next();

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;