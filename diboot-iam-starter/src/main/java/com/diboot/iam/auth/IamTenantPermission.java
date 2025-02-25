/*
 * Copyright (c) 2015-2020, www.dibo.ltd (service@dibo.ltd).
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * <p>
 * https://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.diboot.iam.auth;

import java.util.List;

/**
 * 租户权限过滤
 *
 * @author : uu
 * @version : v1.0
 * @Date 2023/12/21  21:19
 */
public interface IamTenantPermission {

    /**
     * 过滤出当前租户的所有权限id
     *
     * @param tenantId
     * @return
     */
    List<String> findAllPermissions(String tenantId);

    /**
     * 过滤出当前租户的所有权限code
     *
     * @param tenantId
     * @return
     */
    List<String> findAllPermissionCodes(String tenantId);
}
