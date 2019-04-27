//
//  AppDelegate+pgyer.m
//  sedin
//
//  Created by 道至易白金 on 15/11/17.
//  Copyright © 2015年 sedinIT. All rights reserved.
//

#import "AppDelegate+pgyer.h"
#import <PgySDK/PgyManager.h>
#import <PgyUpdate/PgyUpdateManager.h>

@implementation AppDelegate (pgyer)

- (void)checkUpdate{
    NSString *appID = @"4fa214bdf28e89e79c54c9c34861ba6f";
    [[PgyUpdateManager sharedPgyManager] startManagerWithAppId:appID];
    [[PgyUpdateManager sharedPgyManager] checkUpdate];
}


@end
