import koapi from 'null/koapi'
import userManager from 'app/users'
import appointmentManager from 'app/appointments'
import exerciseManager from 'app/exercise'
import exerciseLogManager from 'app/exercise_log'
import exerciseListManager from 'app/exercise_list'
import exerciseListTodayManager from 'app/exercise_list_today'
import nutritionLogManager from 'app/nutrition_log'
import nutritionInformationManager from 'app/nutrition_information'
import foodManager from 'app/food'
import foodLogManager from 'app/food_log'
import foodListManager from 'app/food_list'
import foodRecipeManager from 'app/food_recipe'
import foodLogStatsManager from 'app/food_log_stats'
import waterLogManager from 'app/water_log'
import progressManager from 'app/progress'
import patientPreferencesManager from 'app/patient_preferences'
import ChecklistItemManager from 'app/checklist'
import FavoriteManager from 'app/favorite'
import CardManager from 'app/card'
import goalManager from 'app/goal'
import subscriptionManager from 'app/subscription'
import statusManager from 'app/status'
import preferenceManager from 'app/preference'
import physicalLimitationManager from 'app/physical_limitation'
import medicinesManager from 'app/medicines'
import suplementsManager from 'app/suplements'
import foodLimitationManager from 'app/food_limitation'
import metricsManager from 'app/metrics'
import ordersManager from 'app/orders'
import commentsManager from 'app/comments'
import supportManager from 'app/support'
import appointmentLogManager from 'app/appointments_log'
import userActivitiesManager from 'app/user_activities'
import nutritionistFilesManager from 'app/nutritionist_files'


import colors from 'colors'

var auth = require('../auth')

// custom controllers
import userController from './controllers/users'
import foodController from './controllers/food'
import foodLogStatsController from './controllers/food_log_stats'
import foodLogController from './controllers/food_log'
import foodListController from './controllers/food_list'
import foodRecipeController from './controllers/food_recipe'
import progressController from './controllers/progress'
import goalController from './controllers/goal'
import exerciseController from './controllers/exercise'
import exerciseListController from './controllers/exercise_list'
import exerciseListTodayController from './controllers/exercise_list_today'
import exerciseLogController from './controllers/exercise_log'
import waterLogController from './controllers/water_log'
import appointmentController from './controllers/appointment'
import ChecklistItemController from './controllers/checklist'
import FavoriteController from './controllers/favorite'
import CardController from './controllers/card'
import SubscriptionController from './controllers/subscription'
import metricsController from './controllers/metrics'
import ordersController from './controllers/orders'
import commentsController from './controllers/comments'
import supportController from './controllers/support'
import appointmentLogController from './controllers/appointment_log'
import userActivitiesController from './controllers/user_activities'

var api = {};
api.start = function(app){
  var prefix = "/api/v1";

  // Users
  console.log('[webserver/api]'.blue + ' user resource created')
  koapi.makeResource({
    app: app,
    manager: new userManager(),
    controller: userController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    hasFiles: true,
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false}),
      'PATCH': auth.authenticate('bearer', {session: false})
    }
  });

  // patientPreferencesController
  console.log('[webserver/api]'.blue + ' patient preferences resource created')
  koapi.makeResource({
    app: app,
    manager: new patientPreferencesManager(),
    prefix: prefix,
    allow_methods: ['GET', 'PUT', 'PATCH', 'POST'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'PATCH': auth.authenticate('bearer', {session: false})
    }
  });

  // Appointments
  console.log('[webserver/api]'.blue + ' appointments resource created')
  koapi.makeResource({
    app: app,
    manager: new appointmentManager(),
    controller: appointmentController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false}),
      'PATCH': auth.authenticate('bearer', {session: false})
    }
  });

  // Exercise
  console.log('[webserver/api]'.blue + ' exercise resource created')
  koapi.makeResource({
    app: app,
    manager: new exerciseManager(),
    controller: exerciseController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  // Exercise log
  console.log('[webserver/api]'.blue + ' exercise_log resource created')
  koapi.makeResource({
    app: app,
    manager: new exerciseLogManager(),
    controller:exerciseLogController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false}),
      'PATCH': auth.authenticate('bearer', {session: false})
    }
  });

  // Exercise list
  console.log('[webserver/api]'.blue + ' exercise_list resource created')
  koapi.makeResource({
    app: app,
    manager: new exerciseListManager(),
    controller: exerciseListController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });


  // Exercise list today
  console.log('[webserver/api]'.blue + ' exercise_list_today resource created')
  koapi.makeResource({
    app: app,
    manager: new exerciseListTodayManager(),
    controller: exerciseListTodayController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });


   // Nutrition log
  console.log('[webserver/api]'.blue + ' nutrition_log resource created')
  koapi.makeResource({
    app: app,
    manager: new nutritionLogManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false}),
      'PATCH': auth.authenticate('bearer', {session: false})
    }
  });

  // Nutrition log
  console.log('[webserver/api]'.blue + ' nutrition_information resource created')
  koapi.makeResource({
    app: app,
    manager: new nutritionInformationManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false}),
      'PATCH': auth.authenticate('bearer', {session: false})
    }
  });

  // Food
  console.log('[webserver/api]'.blue + ' food resource created')
  koapi.makeResource({
    app: app,
    manager: new foodManager(),
    controller: foodController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });
  // Food log
  console.log('[webserver/api]'.blue + ' food_log resource created')
  koapi.makeResource({
    app: app,
    manager: new foodLogManager(),
    controller: foodLogController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  // Food log Stats
  console.log('[webserver/api]'.blue + ' food_log_stats resource created')
  koapi.makeResource({
    app: app,
    manager: new foodLogStatsManager(),
    controller: foodLogStatsController,
    prefix: prefix,
    allow_methods: ['GET'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false})
    }
  });

  // Food list
  console.log('[webserver/api]'.blue + ' food_list resource created')
  koapi.makeResource({
    app: app,
    manager: new foodListManager(),
    controller: foodListController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  // Food recipe
  console.log('[webserver/api]'.blue + ' food_recipe resource created')
  koapi.makeResource({
    app: app,
    manager: new foodRecipeManager(),
    controller: foodRecipeController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  // Water log
  console.log('[webserver/api]'.blue + ' water_log resource created')
  koapi.makeResource({
    app: app,
    manager: new waterLogManager(),
    controller: waterLogController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false})
    }
  });

  // Progress log
  console.log('[webserver/api]'.blue + ' progress resource created')
  koapi.makeResource({
    app: app,
    manager: new progressManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT'],
    hasFiles: true,
    controller: progressController,
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' goal resource created')
  koapi.makeResource({
    app: app,
    manager: new goalManager(),
    controller: goalController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' checklist_item resource created')
  koapi.makeResource({
    app: app,
    manager: new ChecklistItemManager(),
    controller: ChecklistItemController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT','DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' favorite resource created')
  koapi.makeResource({
    app: app,
    manager: new FavoriteManager(),
    controller: FavoriteController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' card resource created')
  koapi.makeResource({
    app: app,
    manager: new CardManager(),
    controller: CardController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'DELETE','PUT'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' subscription resource created')
  koapi.makeResource({
    app: app,
    manager: new subscriptionManager(),
    controller: SubscriptionController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false})
    }
  });


  console.log('[webserver/api]'.blue + ' status resource created')
  koapi.makeResource({
    app: app,
    manager: new statusManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' preference resource created')
  koapi.makeResource({
    app: app,
    manager: new preferenceManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' physical_limitation resource created')
  koapi.makeResource({
    app: app,
    manager: new physicalLimitationManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' medicines resource created')
  koapi.makeResource({
    app: app,
    manager: new medicinesManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' suplements resource created')
  koapi.makeResource({
    app: app,
    manager: new suplementsManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  console.log('[webserver/api]'.blue + ' food_limitations resource created')
  koapi.makeResource({
    app: app,
    manager: new foodLimitationManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  // MetricsController
  console.log('[webserver/api]'.blue + ' metrics resource created')
  koapi.makeResource({
    app: app,
    manager: new metricsManager(),
    controller: metricsController,
    prefix: prefix,
    allow_methods: ['GET'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
    }
  });

  // orderController
  console.log('[webserver/api]'.blue + ' orders resource created')
  koapi.makeResource({
    app: app,
    manager: new ordersManager(),
    controller: ordersController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  // CommentsController
  console.log('[webserver/api]'.blue + ' comments resource created')
  koapi.makeResource({
    app: app,
    manager: new commentsManager(),
    controller: commentsController,
    prefix: prefix,
    allow_methods: ['POST'],
    secure_methods: {
      'POST': auth.authenticate('bearer', {session: false}),
    }
  });

  // supportController
  console.log('[webserver/api]'.blue + ' support resource created')
  koapi.makeResource({
    app: app,
    manager: new supportManager(),
    controller: supportController,
    prefix: prefix,
    allow_methods: ['POST'],
    secure_methods: {
      'POST': auth.authenticate('bearer', {session: false}),
    }
  });

  // appointment log Controller
  console.log('[webserver/api]'.blue + ' appointments_log resource created')
  koapi.makeResource({
    app: app,
    manager: new appointmentLogManager(),
    controller: appointmentLogController,
    prefix: prefix,
    allow_methods: ['GET'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
    }
  });

  // user activities Controller
  console.log('[webserver/api]'.blue + ' user_activities resource created')
  koapi.makeResource({
    app: app,
    manager: new userActivitiesManager(),
    controller: userActivitiesController,
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  // nutritionist files Controller
  console.log('[webserver/api]'.blue + ' nutritionist_files resource created')
  koapi.makeResource({
    app: app,
    manager: new nutritionistFilesManager(),
    prefix: prefix,
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    secure_methods: {
      'GET': auth.authenticate('bearer', {session: false}),
      'POST': auth.authenticate('bearer', {session: false}),
      'PUT': auth.authenticate('bearer', {session: false}),
      'DELETE': auth.authenticate('bearer', {session: false})
    }
  });

  // Other
  //var otherManager = require('other');
  //koapi.makeResource(app, otherManager, prefix);
  var auth_routes = require('../auth/routes')
  auth_routes.start(app, {prefix: prefix})
}

ordersController

module.exports = api;
