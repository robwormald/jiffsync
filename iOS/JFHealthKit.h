//
//  JFHealthKit.h
//  jiffsync
//
//  Created by Rob Wormald on 4/17/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@import HealthKit;

@interface JFHealthKit : NSObject <RCTBridgeModule>

@property (nonatomic) HKHealthStore* healthKitStore;




@end
