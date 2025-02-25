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
package diboot.core.test.binder;

import com.diboot.core.data.access.DataScopeManager;
import diboot.core.test.binder.entity.Department;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 数据访问控制测试
 * @author Mazc@dibo.ltd
 * @version v2.0
 * @date 2020/04/24
 */
public class DataAccessPermissionTestImplForDepartment implements DataScopeManager {

    @Override
    public List<Serializable> getAccessibleIds(String fieldName) {
        // 提取其可访问ids
        List<Serializable> accessibleIds = new ArrayList<>();
        if("parentId".equals(fieldName)){
            accessibleIds.add(10001L);
        }
        // ... 其他类型字段
        return accessibleIds;
    }

    @Override
    public List<Class<?>> getEntityClasses() {
        return Arrays.asList(Department.class);
    }

}
